type Props = {
  value: string;
  setValue: (e: any) => void;
};

const SingleExpense = ({ value, setValue }: Props) => {
  return (
    <div className="flex flex-row items-center px-0 py-2">
      <input
        type="text"
        placeholder="Merchant"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 border-gray"
        id="plan-type-input"
      />
      <input
        type="date"
        placeholder="Date"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 text-center border-gray"
        id="plan-type-input"
      />
      <input
        type="number"
        placeholder="Total"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 text-center border-gray"
        id="plan-type-input"
      />
      <input
        type="text"
        placeholder="Currency"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 text-center border-gray"
        id="plan-type-input"
      />
      <input
        type="text"
        placeholder="Category"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 text-center border-gray"
        id="plan-type-input"
      />
      <input
        type="text"
        placeholder="Description"
        value={value}
        onChange={setValue}
        className="px-2 py-2 w-1/3 text-gray-400 text-center border-gray"
        id="plan-type-input"
      />
    </div>
  );
};

export default SingleExpense;
