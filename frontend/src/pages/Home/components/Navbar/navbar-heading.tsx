type HeadingType = {
    text: string;
  };
  
  export default function Heading({ text }: HeadingType) {
    return (
      <>
        <h1 className="text-xl font-bold first-letter:text-3xl">
          {text}
        </h1>
      </>
    );
  }
  