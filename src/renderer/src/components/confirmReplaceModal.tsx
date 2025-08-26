import { FC } from 'react'

type ConfirmReplaceModalProps = {
  open: boolean
  fileName: string | null
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmReplaceModal: FC<ConfirmReplaceModalProps> = ({ open, fileName, onConfirm, onCancel }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[var(--color-background-asphalt)] border border-[var(--color-border-asphalt)] rounded-lg p-4 w-[360px] text-[var(--color-text-orange)] shadow-xl">
        <div className="text-lg font-semibold mb-2">Заменить файл?</div>
        <div className="text-sm opacity-90 mb-4">
          Файл с именем {fileName ? `"${fileName}"` : '...'} уже существует в папке назначения. Заменить его?
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 rounded-md bg-[var(--color-background-dark-blue)] hover:bg-[var(--color-background-dark-blue-hovered)]"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded-md bg-[var(--color-text-orange)] text-black hover:opacity-90"
          >
            Заменить
          </button>
        </div>
      </div>
    </div>
  )
}

