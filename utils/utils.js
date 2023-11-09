export const filterOutTheList = async (data) => {
  let array = [];
  let ids = Array.from(new Set(data.map((r) => r.category)));

  ids.map((id) => {
    let cate = data.filter((r) => r.category === id);
    array.push(cate[cate.length - 1]);
  });
  return array;
};
