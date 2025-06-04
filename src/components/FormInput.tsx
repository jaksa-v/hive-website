interface FormInputProps {
  icon: string;
  placeholder: string;
  name: string;
  required?: boolean;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  icon,
  placeholder,
  name,
  required = false,
  type = "text",
}) => {
  return (
    <label className="flex gap-3 items-center px-5 py-3 w-full bg-white rounded-3xl border border-solid border-[#858584] min-h-[46px]">
      <img
        loading="lazy"
        src={icon}
        alt={`${placeholder} input ikona`}
        className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
      />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
        className="flex-1 shrink self-stretch my-auto basis-0 bg-transparent outline-none"
      />
    </label>
  );
};
