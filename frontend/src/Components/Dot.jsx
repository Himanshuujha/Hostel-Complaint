export const DotGroup = () => {
    return (
        <div className="flex flex-col space-y-2">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="w-2 h-2 bg-gray-600 rounded-full"></div>
            ))}
        </div>
    );
};

export const BigDotGroup = () => {
    return (
      <div className="flex space-x-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-6 h-6 bg-darkGray rounded-full"></div>
        ))}
      </div>
    );
  };
  export default DotGroup;