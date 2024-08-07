import LayoutAdmin from "@/components/layouts/admin";
import prisma from "@lib/prisma";
import Link from "next/link";

async function getUser() {
  const user = await prisma.user.findMany({
    where: {
      telegramId: {
        not: '',
      },
    },
  })
  return user;
}


const user = async () => {
  const user = await getUser();
  // console.log({user});
  return (
    <LayoutAdmin>
      <div>
        <div className="text-center my-4">
          User Table
        </div>
        <div className="overflow-x-auto">
          <table className=" divide-y-2 divide-gray-200 bg-white text-sm text-center">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >User Id</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Telegram ID</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Username</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Data</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ReferralCode</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ReferralToken</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" colSpan={2}> Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {user.map((user, index) => (
                <tr className="odd:bg-gray-50" key={index}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.telegramId}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.username}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.data == null ? 'No data' : (JSON.stringify(user.data))}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.referralCode}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.referralToken}</td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <Link href={`edit/${user.id}`}>Edit</Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    <Link href={`delete/${user.id}`}>Delete</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button className="m-2 p-2 border-2 bg-green-700 text-white" >
            <Link href={'/admin/users/create_user'}>
            New User
            </Link>
          </button>
        </div>
      </div>
    </LayoutAdmin>
  )
}
export default user