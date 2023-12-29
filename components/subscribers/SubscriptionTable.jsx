import Link from "next/link";
import moment from "moment";

const SubscriptionTable = ({ email, index }) => {
  //   var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <tr className="table-row  h-[55px] border-b-2 border-gray-100 ">
      <td></td>
      <td>
        <Link
          href="/"
          className="flex items-center  max-w-[360px] relative align-middle break-words text-de"
        >
          <span
            className={`${
              index % 2 === 0 ? "bg-red-400" : "bg-cyan-700"
            } text-white text-[16px] leading-[22px] uppercase mr-2 h-8 w-8 flex items-center justify-center rounded-full`}
          >
            {email.name[0]}
          </span>
          <span>
            <span className="block text-gray-800 font-semibold">
              {email.name}
            </span>
            <span className="text-gray-700 no-underline">{email.email}</span>
          </span>
        </Link>
      </td>
      <td>
        <span className="text-gray-700">
          {moment(email.date).format("MMM DD,YYYY")}
        </span>
      </td>
      <td className="text-gray-700">{email?.state}</td>
      <td className="text-gray-700">{email?.location}</td>
    </tr>
  );
};

export default SubscriptionTable;
