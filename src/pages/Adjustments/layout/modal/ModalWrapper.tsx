export const ModalWrapper = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <>
    <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-[600px] bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center px-4 py-3 ">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose} className="cursor-pointer">
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  </>
);
