export default function CheckBox(props: {
  label: string,
  name: string,
  id: string,
  className: string,
  register: any,
}) {
  return (
    <div className="flex items-center">
      <input
        { ...props.register }
        id={ props.id }
        name={ props.name }
        type="checkbox"
        className={ "focus:ring-0 focus:ring-offset-red-600 bg-neutral-700 border-neutral-600 rounded " + props.className }
      />
      <label htmlFor={ props.id } className="ml-2 block text-sm text-neutral-200">{ props.label }</label>
    </div>
  )
}