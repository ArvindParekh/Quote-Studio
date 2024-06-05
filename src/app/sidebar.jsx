// eslint-disable-next-line react/prop-types
const Sidebar = ({ groups }) => {
  return (
    <div className="flex h-full w-[30%] flex-col gap-5 overflow-auto rounded-3xl bg-[#7d2a52] p-7 text-white shadow-2xl shadow-[#7d2a52]">
      {groups.map((group) => group)}
    </div>
  );
};

export default Sidebar;
