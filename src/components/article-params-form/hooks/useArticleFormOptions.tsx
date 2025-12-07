import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../../constants/articleProps';
import { TextProps } from '../../../ui/text/Text';
import { useState } from 'react';

// Кастомный хук содержит логику по описанию состояния необходимых полей формы, задает дефолтные значения.
// Хук возвращает пропсы для компонентов формы с дефолтными значениями и обновленные данные из формы.

export const useArticleFormOptions = () => {
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [selectedContentWidthArr, setSelectedContentWidthArr] =
		useState<OptionType>(defaultArticleState.contentWidth);

	const formProps = {
		titleProps: {
			children: 'Задайте параметры',
			as: 'h2',
			size: 31,
			weight: 800,
			fontStyle: 'normal',
			uppercase: true,
		} as TextProps,

		fontFamilySelectProps: {
			selected: selectedFont,
			options: fontFamilyOptions,
			placeholder: defaultArticleState.fontFamilyOption.title,
			onChange: setSelectedFont,
			title: 'шрифт',
		},

		fontSizeProps: {
			name: 'fontSize',
			options: fontSizeOptions,
			selected: selectedFontSize,
			onChange: setSelectedFontSize,
			title: 'размер',
		},

		fontColorsProps: {
			selected: selectedFontColor,
			options: fontColors,
			placeholder: defaultArticleState.fontColor.title,
			onChange: setSelectedFontColor,
			title: 'цвет шрифта',
		},

		backgroundColor: {
			selected: selectedBgColor,
			options: backgroundColors,
			placeholder: defaultArticleState.backgroundColor.title,
			onChange: setSelectedBgColor,
			title: 'цвет фона',
		},

		contentWidth: {
			selected: selectedContentWidthArr,
			options: contentWidthArr,
			placeholder: defaultArticleState.contentWidth.title,
			onChange: setSelectedContentWidthArr,
			title: 'ширина контента',
		},
	};

	const getFormValues = () => ({
		fontFamilyOption: selectedFont.value,
		fontSizeOption: selectedFontSize.value,
		fontColor: selectedFontColor.value,
		backgroundColor: selectedBgColor.value,
		contentWidth: selectedContentWidthArr.value,
	});

	const resetForm = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedContentWidthArr(defaultArticleState.contentWidth);
	};

	return {
		getFormValues,
		formProps,
		resetForm,
	};
};
