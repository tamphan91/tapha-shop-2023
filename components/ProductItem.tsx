"use client"

interface ProductItemProps {
  addHandler: Function;
}

export default function ProductItem({ addHandler }: ProductItemProps) {
  return (
    <div className="relative h-52 w-full bg-orange-300">
      <button
        onClick={async ()=>{console.log('addHandler()', await addHandler())}}
        type="button"
        className="absolute inset-x-0 bottom-0  bg-blue-300 cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
