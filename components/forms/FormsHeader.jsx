import { FormsTotal } from "@/app/action/total";
import Chart from "@/components/forms/barChart";
const FormsHeader = () => {
  return (
    <div className="overflow-hidden bg-white border-b border-gray-200 h-[520px]">
      {/* <div className=""> */}
      <FormsTotal />
      {/* </div> */}
    </div>
  );
};

export default FormsHeader;
