import { useEffect, useRef, useState } from 'react';

// Хук использует ref Aside панели и состояние открытия панели чтобы реализовать логику
// закрытия панели при клике вне панели (если открыто).
// Хук возвращает ref панели, статус открытия и метод изменения состояния.

export const useAsideMenuClick = () => {
	const [isOpen, setOpenAsideState] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		// Если элемент закрыт, обработчики не нужны
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target as Node;

			// Если панель открыта и клик вне панели - закрываем
			if (
				target instanceof Node &&
				asideRef.current &&
				!asideRef.current.contains(target)
			) {
				setOpenAsideState(false);
			}
		};
		// Закрытие по нажатию Escape
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpenAsideState(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return {
		asideRef,
		isOpen,
		setOpenAsideState,
	};
};
