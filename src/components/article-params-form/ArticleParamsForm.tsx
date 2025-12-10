import styles from './ArticleParamsForm.module.scss';
// Компоненты
import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
//Типы
import { TFormActions } from '../../index';
// Библиотеки, хуки
import { clsx } from 'clsx';
import { FormEvent, useRef } from 'react';
import { useArticleFormOptions } from './hooks/useArticleFormOptions';
import { useAsideMenuClick } from './hooks/useAsideMenuClick';

export const ArticleParamsForm = ({ onSubmit, onClear }: TFormActions) => {
	const { asideRef, isOpen, setOpenAsideState } = useAsideMenuClick();
	const { formProps, getFormValues, resetForm } = useArticleFormOptions();
	const formRef = useRef<HTMLFormElement>(null);

	const className = clsx(styles.container, { [styles.container_open]: isOpen });

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(getFormValues());
	};

	const handleClear = (e: FormEvent) => {
		e.preventDefault();
		resetForm();
		onClear();
	};

	const toggleAside = () => {
		setOpenAsideState((prev) => !prev);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleAside} />
			<aside className={className} ref={asideRef}>
				<form
					ref={formRef}
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleClear}>
					<Text {...formProps.titleProps} />
					<Select {...formProps.fontFamilySelectProps} />
					<RadioGroup {...formProps.fontSizeProps} />
					<Select {...formProps.fontColorsProps} />
					<Separator />
					<Select {...formProps.backgroundColor} />
					<Select {...formProps.contentWidth} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
