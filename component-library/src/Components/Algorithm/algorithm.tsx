export const Algorithm = () => {
  console.log("Running");

  function task() {
    console.log("Result");
  }

  return (
    <div
      onClick={() => {
        task();
      }}
    >
      Data
    </div>
  );
};
