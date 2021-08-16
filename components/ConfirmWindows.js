import Button from "./Button";

export default function ConfirmWindows({ setConfirmDelete }) {
  return (
    <div className=" flex items-center justify-center gap-4">
      <Button
        onClick={() => {
          setConfirmDelete(false);
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          setConfirmDelete(true);
        }}
        color="red"
      >
        Confirm
      </Button>
    </div>
  );
}
