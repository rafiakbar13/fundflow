import React from "react";
type Props = {};

const ImageColumn = ({ row, accessorKey }: any) => {
  const imageUrl = row.getValue(`${accessorKey}`);

  return (
    <div className="line-clamp-1">
      <img
        src={imageUrl as string}
        alt={""}
        width={500}
        height={500}
        className="object-cover w-10 h-10"
      />
    </div>
  );
};

export default ImageColumn;
