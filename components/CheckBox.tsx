export default function CheckBox(props: {
  label: string,
  name: string,
  className: string,
  registerForm: any,
}) {
  const id = props.name + "_id"
  return (
    <div className="flex items-center">
      <input
        { ...props.registerForm }
        id={ id }
        name={ props.name }
        type="checkbox"
        className={ "text-red-600 focus:ring-red-500 border-gray-300 rounded " + props.className }
      />
      <label htmlFor={ id } className="ml-2 block text-sm text-gray-900">{ props.label }</label>
    </div>
  )
}