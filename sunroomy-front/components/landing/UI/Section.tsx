interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
}
const Section = ({ className, id, children }: SectionProps) => {
  return (
    <div id={id} className={`${className}`}>
      {children}
    </div>
  );
};

export default Section;
