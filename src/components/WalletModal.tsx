import { X } from "lucide-react";

export default function WalletModal({
  wp,
  onClose,
}: {
  wp: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-80 space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">Wallet</h2>
        <p className="text-4xl font-extrabold text-primary">
          {wp.toLocaleString()} WP
        </p>
        <p className="text-sm text-gray-400">
          Locked WP unlocks 1 : 1 as you spend entry fees.
        </p>
      </div>
    </div>
  );
}
