import type { FormEvent } from "react";
import { FormInput } from "./FormInput";

export const ContactForm: React.FC = () => {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/mailerlite", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Clear the form on success
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Sorry, there was an error submitting your form. Please try again."
      );
    }
  }

  return (
    <section className="pt-8 pb-10 max-w-sm mx-auto">
      <div className="w-full text-black">
        <div className="w-full">
          <h1 className="text-white flex-1 shrink gap-2.5 w-full text-4xl font-semibold leading-10 capitalize">
            Kontaktirajte nas!
          </h1>
          <p className="text-white mt-5 w-full text-base leading-6">
            Zdravo! Unesite Vaše informacije i kategorije ili aktivnosti za koje
            ste zainteresovani.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mt-8 w-full text-base leading-snug">
        <div className="w-full text-black space-y-4">
          <FormInput
            icon="https://cdn.builder.io/api/v1/image/assets/726deaa1fcc84d7f9722de30ef6f2b4e/882550ed05f793a76abdaee5de9f9178b008d82df37653e81a7d488160d08eac"
            placeholder="Ime/Naziv firme *"
            name="name"
            required
          />

          <FormInput
            icon="https://cdn.builder.io/api/v1/image/assets/726deaa1fcc84d7f9722de30ef6f2b4e/0bc1ea54608363a9b1b1aa94d0ba1c1ed3ca653e6245ddd977f4bc95cd048f0e"
            placeholder="Email Adresa *"
            type="email"
            name="email"
            required
          />

          <FormInput
            icon="https://cdn.builder.io/api/v1/image/assets/726deaa1fcc84d7f9722de30ef6f2b4e/2f1198c9512998f3d7532573b501fd1751f99e9485bae5ea245d679be650b4ee"
            placeholder="Broj telefona *"
            type="tel"
            name="mobile"
            required
          />

          <FormInput
            icon="https://cdn.builder.io/api/v1/image/assets/726deaa1fcc84d7f9722de30ef6f2b4e/2f1198c9512998f3d7532573b501fd1751f99e9485bae5ea245d679be650b4ee"
            placeholder="Aktivnost"
            name="activity"
          />
        </div>

        <div className="mt-8">
          <button
            className="flex justify-center items-center gap-3 px-12 py-3 w-full font-semibold text-center text-white bg-fuchsia-600 rounded-3xl min-h-[46px] hover:bg-fuchsia-700 transition-colors"
            type="submit"
          >
            Kontaktiraj nas!
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
