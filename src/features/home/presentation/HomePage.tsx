'use client';

import { HeroSection } from './components/HeroSection';
import { QuickLinks } from './components/QuickLinks';
import { UpcomingEvents } from './components/UpcomingEvents';
import { ShopPreview } from './components/ShopPreview';
import { RecentPosts } from './components/RecentPosts';
import { PointRanking } from './components/PointRanking';

export function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 md:pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeroSection />
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    <div className="col-span-12 lg:col-span-8">
                        <UpcomingEvents />
                    </div>

                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <PointRanking />
                    </div>
                    <div className="col-span-12 lg:col-span-8">
                        <RecentPosts />
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                        <QuickLinks />
                    </div>
                    <div className="col-span-12">
                        <ShopPreview />
                    </div>
                </div>
            </div>
        </main>
    );
}
