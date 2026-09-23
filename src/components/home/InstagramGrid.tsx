import React from 'react';
import { INSTAGRAM_POSTS } from '../../data/instagram';
import { Heart, MessageCircle } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { motion } from 'framer-motion';

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-[#C9A86A]/25 mb-4">
            <InstagramIcon className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A86A] font-medium">
              Community & Inspirations
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#F5F1E8] uppercase tracking-tight">
            Follow the Moments
          </h2>

          <p className="mt-3 text-sm text-[#A8A39A] font-light">
            Tag your intimate unboxings with{' '}
            <span className="text-[#C9A86A] font-medium">#GiftsThatBecomeMemories</span> for a chance
            to be featured in our private salon.
          </p>
        </div>

        {/* 3x2 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {INSTAGRAM_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="group relative aspect-square rounded-sm overflow-hidden bg-[#151515] border border-white/[0.06] cursor-pointer"
            >
              {/* Image */}
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Tag Label */}
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm bg-[#080808]/75 backdrop-blur-md text-[#E5D0A6] border border-white/10">
                  {post.tag}
                </span>
              </div>

              {/* Hover Dark Glass Overlay */}
              <div className="absolute inset-0 bg-[#080808]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-center">
                {/* Center Instagram Icon */}
                <div className="m-auto flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A86A]/20 border border-[#C9A86A]/50 flex items-center justify-center text-[#C9A86A] mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] text-[#F5F1E8] line-clamp-2 px-2 font-serif italic">
                    "{post.caption}"
                  </p>
                </div>

                {/* Bottom Likes and Comments */}
                <div className="flex items-center justify-center gap-4 text-xs text-[#A8A39A]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#C9A86A] fill-[#C9A86A]" />
                    {post.likes.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Handle */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-xs font-serif uppercase tracking-[0.3em] text-[#C9A86A] hover:text-[#DFC287] transition-colors py-2 px-6 border border-[#C9A86A]/40 rounded-full hover:bg-[#C9A86A]/10 hover:border-[#C9A86A]"
          >
            <InstagramIcon className="w-4 h-4" />
            @novagifts
          </a>
        </div>
      </div>
    </section>
  );
};
