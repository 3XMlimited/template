import FormsHeader from "@/components/forms/FormsHeader";
import FormsTable from "@/components/forms/FormsTable";
const page = () => {
  return (
    <main className="container relative">
      {/* <FormChart sum={sum} /> */}
      <div>
        <FormsHeader />
      </div>

      {/* title */}
      <FormsTable />
    </main>
  );
};

export default page;
