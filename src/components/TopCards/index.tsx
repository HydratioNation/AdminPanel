import React, { FC } from "react";

interface IProps {
  data: {
    sales: number;
    customers: number;
  }[];
}

const TopCards: FC<IProps> = ({ data }) => {
  const Revenue = () => {
    const math = ((data[0].sales - data[1].sales) / data[1].sales) * 100;
    if (math > 0) {
      return "+" + math;
    }
    return math;
  };

  const Customers = () => {
    const math = ((data[0].customers - data[1].customers) / data[1].customers) * 100;
    if (math > 0) {
      return "+" + math;
    }
    return math;
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">${data[0].sales}</p>
          <p className="text-gray-600">Monthly Revenue</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">{Revenue()}%</span>
        </p>
      </div>

      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{data[0].customers}</p>
          <p className="text-gray-600">Customers</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">{Customers()}</span>
        </p>
      </div>
    </div>
  );
};

export default TopCards;
