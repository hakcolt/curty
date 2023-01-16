export default function InputType(props: {
  label: string,
  name: string,
  type: string,
  autoComplete?: string
  className: string,
  registerForm: any,
  required?: boolean
}) {
  const id = props.name + "_id"
  return (
    <div>
      <label htmlFor={id} className="sr-only">{props.label}</label>
      <input
        { ...props.registerForm }
        id={id}
        name={props.name}
        type={props.type}
        autoComplete={props.autoComplete}
        className={ "appearance-none rounded-none relative px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm " + props.className }
        required={ props.required }
        placeholder={props.label}
      />
    </div>
  )
}