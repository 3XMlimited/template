import moment from "moment";
import exportFromJSON from "export-from-json";

export const filterOutTheList = async (data) => {
  let array = [];
  let ids = Array.from(new Set(data.map((r) => r.category)));

  ids.map((id) => {
    let cate = data.filter((r) => r.category === id);
    array.push(cate[cate.length - 1]);
  });
  return array;
};

// get Date range
export const getDaysArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(moment(dt).format("YYYY-MM-DD"));
  }
  // console.log(arr);
  return arr;
};

// export csv

export const exportCsv = (data, date) => {
  // const fileName = prompt("file name:");
  const fileName =
    moment(date.from).format("DD/MM/YY") +
    "-" +
    moment(date.to).format("DD/MM/YY");
  const exportType = exportFromJSON.types.csv;

  // let result = Array.from(new Set(emails));
  // let results = [];
  // result.map((r) => {
  //   results.push({ email: r });
  // });
  exportFromJSON({ data, fileName, exportType });
};

export const fetchLabelData = async () => {
  const response = await fetch("/api/subscription");
  const data = await response.json();

  // console.log("data", data);
  return data;
};
