type InputArgs = {
  register: any,
  id: string,
  name: string,
  type: string,
  placeholder?: boolean,
  className: string,
  label: string,
  children: any
}

export default function SelectForm({
  register,
  id,
  name,
  type,
  className,
  label,
  children
}: InputArgs) {
  return (
    <>
      <label htmlFor={ id } className="block text-sm font-medium text-neutral-100">{ label }</label>

      <select
        { ...register }
        id={ id }
        name={ name }
        type={ type }
        className={ "rounded-md bg-neutral-700 mt-1 border-neutral-600 px-3 py-2 border focus:outline-none text-neutral-100 caret-red-600 focus:ring-red-600 focus:border-red-600 sm:text-sm "
          + className
        }>
          {children}
        </select>
    </>
  )
}