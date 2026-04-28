"use client";

import styles from "./searchbar.module.css";
import {InstantSearch, Hits, SearchBox} from "react-instantsearch";
import {searchClient} from "@/typesense/typesenseAdapter";
import { useInstantSearch } from 'react-instantsearch';
import Image from "next/image";
import React, {useEffect, useState} from "react";

type CustomHitsProps = {
    hitComponent : any,
    collection : string
}

export type SearchBarProps = {
    groupId : string;
}

const CustomHits = ({ hitComponent, collection } : CustomHitsProps  ) => {
    const { results, uiState } = useInstantSearch();
    const query = uiState[collection]?.query;
    if (!query) return null

    if (results.nbHits === 0) {
        return <div className='mt-2'>Ничего не найдено по запросу</div>;
    }

    return <Hits hitComponent={hitComponent}  />;
};

export function SearchBar({groupId} : SearchBarProps) {

    const [collection, setCollection] = useState('faq_search1');
    const [reRender, setReRender] =  useState(false);

    useEffect(() => {
        setReRender(!reRender);
        setCollection('faq_search' + groupId.toString());
    }, [groupId]);

    interface FAQHit {
        question: string;
        answer: string;
    }

    const HitItem = ({ hit }: { hit: FAQHit }) => (
        <div className='mt-2 mb-1'>
            <h4 className='text-lg text-slate-800'>{hit.question}</h4>
            <p className='text-sm text-slate-600'>{hit.answer}</p>
            <div className="border-t-4 rounded-2xl w-auto border-gray-400 md:m-2"></div>
        </div>
    );

    return (
        <div className='ml-2 mr-2 w-[300px] md:w-auto' >
            {reRender && <InstantSearch  indexName={collection} searchClient={searchClient}>
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

                <CustomHits collection={collection} hitComponent={HitItem}></CustomHits>
            </InstantSearch>}
            {!reRender && <InstantSearch indexName={collection} searchClient={searchClient}>
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

                <CustomHits collection={collection} hitComponent={HitItem}></CustomHits>
            </InstantSearch>}
        </div>
    );
}