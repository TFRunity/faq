"use client";

import styles from "./searchbar.module.css";
import {InstantSearch, Hits, SearchBox} from "react-instantsearch";
import {searchClient} from "@/typesense/typesenseAdapter";
import { useInstantSearch } from 'react-instantsearch';
import Image from "next/image";
import React, {useEffect, useState} from "react";
import Collection from "typesense/lib/Typesense/Collection";

type CustomHitsProps = {
    hitComponent : any
}

export type SearchBarProps = {
    groupId : string;
}

const CustomHits = ({ hitComponent } : CustomHitsProps  ) => {
    const { results, uiState } = useInstantSearch();
    const query = uiState.faq_search?.query;

    if (!query) {
        return null;
    }

    if (results.nbHits === 0) {
        return <div className='ml-12 mt-2'>Ничего не найдено по запросу "{query}"</div>;
    }

    return <Hits hitComponent={hitComponent} />;
};

export function SearchBar({groupId} : SearchBarProps) {

    const [collection, setCollection] = useState('faq_search1');

    useEffect(() => {
        setCollection('faq_search'+groupId);
    }, [groupId]);

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
            <InstantSearch indexName={collection} searchClient={searchClient}>
                <SearchBox
                    placeholder="Введите ваш вопрос или ключевые слова"
                    classNames={{
                        form: styles.searchForm,
                        input: styles.searchInput,
                        submit: styles.searchButton,
                        reset: styles.resetButton,
                    }}
                    submitIconComponent={() => (
                        <Image src='/icons/lupa.png' width='24' height='24' alt='search' />
                    )}
                    resetIconComponent={() => (
                        <Image src='/icons/close.png' width='24' height='24' alt='clean' />
                    )}
                    loadingIconComponent={() => <div className={styles.loadingSpinner}/>}
                />

                <CustomHits hitComponent={HitItem}></CustomHits>
            </InstantSearch>
        </div>
    );
}