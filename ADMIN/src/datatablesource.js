export const userColumns = [
  {
    field: "user",
    headerName: "User name",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.username}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 200,
  },
];

export const roomColumns = [
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
