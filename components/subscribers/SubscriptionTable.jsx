import Link from "next/link";
import moment from "moment";
import { Checkbox } from "@/components/ui/checkbox";
const SubscriptionTable = ({ email, index, selectedIds, setSelectedIds }) => {
  //   var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <tr className="table-row  h-[55px] border-b-2 border-gray-100 ">
      <td className="text-center">
        <Checkbox
          id={email._id}
          checked={selectedIds.includes(email._id)}
          onCheckedChange={(e) =>
            e
              ? setSelectedIds((prev) => [...prev, email._id])
              : setSelectedIds((prev) => prev.filter((r) => r !== email._id))
          }
        />
      </td>
      <td>
        <Link
          href={`/subscribers/${email._id}`}
          className="flex items-center  max-w-[360px] relative align-middle break-words "
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
        <span className="text-gray-700 ">
          {moment(email.date).format("MMM DD,YYYY")}
        </span>
      </td>
      <td className="text-gray-700 uppercase pl-0">{email?.state}</td>
      <td className="text-gray-700 ">{email?.location}</td>
    </tr>
  );
};

export default SubscriptionTable;
