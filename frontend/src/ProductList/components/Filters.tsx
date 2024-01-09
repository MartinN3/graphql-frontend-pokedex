export default function Filter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-1 gap-6 md:gap-2 lg:gap-6 px-4 lg:pt-28 pb-20 lg:pb-9">
      <div>
        <h6 className="font-bold text-sky-700 mb-5">Type of attack</h6>
        <div className="flex mb-2 items-center">
          <input className="mr-3" type="checkbox" id="test" />
          <label className="ms-3 font-medium text-gray-600" htmlFor="test">
            Ranged
          </label>
        </div>
      </div>
    </div>
  );
}
