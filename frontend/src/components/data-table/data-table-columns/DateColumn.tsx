import React from "react";

type Props = {};

const DateColumn = ({ row, accessorKey }: any) => {
  const createdAt = row.getValue(`${accessorKey}`);
  const originalCreatedAt = new Date(createdAt as Date);
  const day = originalCreatedAt.getDate();
  const month = originalCreatedAt.toLocaleDateString("default", {
    month: "short",
  });
  const year = originalCreatedAt.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return (
    <div className="">
      <p>{formattedDate}</p>
    </div>
  );
};

export default DateColumn;
