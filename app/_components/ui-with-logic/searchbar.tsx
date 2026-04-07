"use client";

import styles from "./searchbar.module.css";
import {InstantSearch, Hits, SearchBox} from "react-instantsearch";
import {searchClient} from "@/typesense/typesenseAdapter";
import {check, setupSchema} from "@/typesense/typesenseSchema";
import {useEffect} from "react";
import {checkpg, getQuestionAllAnswers, QuestionWithAnswers} from "@/app/_actions/faq-actions";
import sync, {sssync} from "@/typesense/typesenseSyncScript";

interface FAQHit {
    question: string;
    answer: string;
}

const HitItem = ({ hit }: { hit: FAQHit }) => (
    <div className={styles.hitItem}>
        <h4>{hit.question}</h4>
        <p>{hit.answer}</p>
    </div>
);



export const SearchBar = () => {

    return (
        <div className={styles.searchContainer}>
            <InstantSearch indexName='faq_search' searchClient={searchClient} >
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
                <Hits hitComponent={HitItem} />
            </InstantSearch>
        </div>
    );
};