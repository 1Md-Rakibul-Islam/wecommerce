import { ContactForm } from "./contact-form";
import { ContactSidebar } from "./ContactSidebar";

const ContactFromSection = () => {
  return (
    <section className="container-page py-8 lg:py-12 max-w-5xl">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <ContactForm />
        <ContactSidebar />
      </div>
    </section>
  );
};

export default ContactFromSection;
