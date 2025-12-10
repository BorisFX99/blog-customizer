import styles from './styles/index.module.scss';
import './styles/index.scss';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import { StrictMode, CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

//Тип параметра переданной колбек-функции при отправке формы
export type TArticleStyleState = {
	fontFamilyOption: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
	fontSizeOption: string;
};

export type TFormActions = {
	onSubmit: (newOptions: TArticleStyleState) => void;
	onClear: () => void;
};

const defStyleOptions = {
	fontFamilyOption: defaultArticleState.fontFamilyOption.value,
	fontColor: defaultArticleState.fontColor.value,
	backgroundColor: defaultArticleState.backgroundColor.value,
	contentWidth: defaultArticleState.contentWidth.value,
	fontSizeOption: defaultArticleState.fontSizeOption.value,
};

const App = () => {
	const [articleState, setArticleState] = useState(defStyleOptions);

	const handleSubmit = (newOptions: TArticleStyleState) => {
		setArticleState((prev) => ({ ...prev, ...newOptions }));
	};

	const handleClear = () => {
		setArticleState(defStyleOptions);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption,
					'--font-size': articleState.fontSizeOption,
					'--font-color': articleState.fontColor,
					'--container-width': articleState.contentWidth,
					'--bg-color': articleState.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleSubmit} onClear={handleClear} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
