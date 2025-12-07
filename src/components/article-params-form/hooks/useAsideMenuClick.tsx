import { useEffect, useRef, useState } from 'react';

// Хук использует ref Aside панели и состояние открытия панели чтобы реализовать логику
// закрытия панели при клике вне панели (если открыто).
// Хук возвращает ref панели, статус открытия и метод изменения состояния.

export const useAsideMenuClick = () => {
	const [isOpen, setOpenAsideState] = useState(false);
	const asideRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const target = event.target as Node;

			// Если панель открыта и клик вне панели - закрываем
			if (isOpen && asideRef.current && !asideRef.current.contains(target)) {
				setOpenAsideState(false);
			}
		};
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);

	return {
		asideRef,
		isOpen,
		setOpenAsideState,
	};
};
