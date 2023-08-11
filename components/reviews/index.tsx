import Image from "next/image";
import Star from "../shared/icons/star";

const Reviews = () => {
  return (
    <div className="inline-flex items-start gap-2 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm drop-shadow-sm">
      <div className="flex flex-col items-start gap-[14px]">
        <p className="mr-6 max-w-xs font-inter text-sm font-light text-black">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
        <div className="flex items-start gap-4 self-stretch">
          <Image
            src="/empty-profile-picture.png"
            height={53.691}
            width={53.691}
            className="rounded-full border-2 border-emerald-400 bg-white"
            alt=""
          />
          <div className="mr-6 flex w-full flex-col items-start gap-1">
            <p className="text-xl font-bold text-black">Darrell Steward</p>
            <div className="flex items-start justify-between self-stretch">
              <div className="flex items-start gap-[5.439px]">
                <Star fill="#4FAEAB" />
                <Star fill="#4FAEAB" />
                <Star fill="#4FAEAB" />
                <Star fill="#4FAEAB" />
                <Star fill="#D9D9D9" />
              </div>
              <p className="text-xs text-stone-300">8 May 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
