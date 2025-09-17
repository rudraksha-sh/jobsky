import React from 'react';
import type { Page } from '../App';

interface FooterProps {
    page: Page;
}

const generationPages: Page[] = ['advisor', 'resume'];

export const Footer: React.FC<FooterProps> = ({ page }) => {
    return (
        <footer className="bg-gray-900 mt-auto border-t border-gray-800">
            <div className="container mx-auto py-6 px-4 md:px-8 text-center text-gray-400 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} JOBSKY. All rights reserved.
                </p>
                {generationPages.includes(page) && (
                  <p className="mt-2 text-gray-500">
                    Career intelligence powered by Google Gemini.
                  </p>
                )}
            </div>
        </footer>
    );
};