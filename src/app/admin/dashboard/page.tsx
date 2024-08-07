import LayoutAdmin from "@/components/layouts/admin";
import Link from "next/link";

const Dashboard = () => {
  return (
    <LayoutAdmin>
      <div className="max-w-[450px] mx-auto py-10">
      <Link href="/admin/users">
        <button type="button" className="border-2 bg-red-500 px-5 mx-2">
          User Details
        </button>
          </Link>
      </div>
      {/* <div className="border border-[#fff] p-[10px]">
          <form>
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Video Url</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Code</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
              </label>
            </div>
            <div className="mt-[16px]">
              <button className="btn">Button</button>
            </div>
          </form>
        </div> */}
    </LayoutAdmin>
  );
};

export default Dashboard;

 