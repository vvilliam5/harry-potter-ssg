import { MedievalSharp, Rye } from "next/font/google";

const medievalSharp = MedievalSharp({ weight: "400" });
const rye = Rye({ weight: "400" });

export default function CharacterInfo({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <div>
      <h4 className={`${medievalSharp.className} text-md`}>{name}:</h4>
      <p className={`${rye.className} text-xl text-gray-400`}>
        {value?.toUpperCase() || ""}
      </p>
    </div>
  );
}
