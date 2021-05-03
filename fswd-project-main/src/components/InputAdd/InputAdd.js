export const InputAdd = (prop) => {
  return (
    <input
      className="shadow appearance-none border rounded w-min py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
      placeholder="Enter Tag"
      name={prop.name}
      onChange={prop.onChange}
      onKeyDown={prop.onKeyDown}
      disabled={prop.disabled}
      value={prop.value}
    />
  )
}
