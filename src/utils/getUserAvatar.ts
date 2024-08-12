const getUserAvarta = async (telegramUserId: string) => {
  const getUserProfilePhotoUrl = `${process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_LINK}${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/getUserProfilePhotos`;

  try {
    let result = await fetch(getUserProfilePhotoUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id: telegramUserId,
        offset: 0,
        limit: 1
      }),
    })

    let resultJson = await result.json();
    // console.log("result", resultJson);
    const totalCount = resultJson.result.total_count;
    // console.log("totalCount", totalCount);

    if (totalCount == 0) {
      // console.log("total Count is Zero");
      return {
        ok: false,
        url: ""
      };
    }

    const photoInfo = resultJson.result.photos[0][0];

    const getFileUrl = `${process.env.NEXT_PUBLIC_TELEGRAM_BOT_API_LINK}${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/getFile`;

    result = await fetch(getFileUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        file_id: photoInfo.file_id
      }),
    });

    resultJson = await result.json();

    const photoFilePath = resultJson.result.file_path;

    const userAvataFileUrl = `${process.env.NEXT_PUBLIC_TELEGRAM_BOT_PHTO_LINK}${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/${photoFilePath}`;

    return {
      ok: true,
      url: userAvataFileUrl
    }
  } catch (error) {
    return {
      ok: false,
      url: ""
    }
  }
}

export default getUserAvarta;