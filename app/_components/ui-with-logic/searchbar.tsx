"use client";

import styles from "./searchbar.module.css";
import {InstantSearch, Hits, SearchBox} from "react-instantsearch";
import {searchClient} from "@/typesense/typesenseAdapter";
import { useInstantSearch } from 'react-instantsearch';


const CustomHits = ({ hitComponent }) => {
    const { results, uiState } = useInstantSearch();
    const query = uiState.faq_search?.query; // 'faq_search' — это ваш indexName

    // Не показываем ничего, если запроса нет
    if (!query) {
        return null;
    }

    // Бонус: если запрос есть, но результатов 0 — выводим сообщение
    if (results.nbHits === 0) {
        return <div className='ml-12 mt-2'>Ничего не найдено по запросу "{query}"</div>;
    }

    return <Hits hitComponent={hitComponent} />;
};

export function SearchBar() {

    interface FAQHit {
        question: string;
        answer: string;
    }

    const HitItem = ({ hit }: { hit: FAQHit }) => (
        <div className='mt-2 mb-3 ml-12 mr-2'>
            <h4 className='text-lg text-slate-800'>{hit.question}</h4>
            <p className='text-sm text-slate-600'>{hit.answer}</p>
        </div>
    );

    return (
        <div className={styles.searchContainer}>
            <InstantSearch indexName='faq_search' searchClient={searchClient}>
                <SearchBox
                    placeholder="Введите ваш вопрос или ключевые слова"
                    classNames={{
                        form: styles.searchForm,
                        input: styles.searchInput,
                        submit: styles.searchButton,
                        reset: styles.resetButton,
                    }}
                    submitIconComponent={() => (
                        <svg
                            //иконка лупы
                            className={styles.searchIcon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    )}
                    resetIconComponent={() => (
                        <svg
                            //иконка крестика
                            className={styles.closeIcon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                    loadingIconComponent={() => <div className={styles.loadingSpinner}/>}
                />

                <CustomHits hitComponent={HitItem}></CustomHits>

            </InstantSearch>
        </div>
    );
}