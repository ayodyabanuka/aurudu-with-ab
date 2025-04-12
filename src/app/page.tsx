'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { intervalToDuration } from 'date-fns';
import { events } from '@/utils';
import { GoMute, GoUnmute } from 'react-icons/go';
import { BiPlay, BiStop } from 'react-icons/bi';
import Link from 'next/link';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    intervalToDuration({ start: new Date(), end: new Date(events[0].date) })
  );
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the music is playing
  const hasTriggered = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        console.log('Autoplay prevented. User interaction required.');
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(events[currentIndex].date);
      const remaining = targetDate.getTime() - now.getTime();

      if (remaining <= 0 && !hasTriggered.current) {
        hasTriggered.current = true;

        if (currentIndex < events.length - 1) {
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            hasTriggered.current = false;
          }, 1000);
        }
      } else if (remaining > 0) {
        setTimeLeft(intervalToDuration({ start: now, end: targetDate }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const event = events[currentIndex];
  return (
    <div className=''>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className='absolute top-4 right-18 bg-orange-600 hover:bg-orange-700 text-white px-4 py-4 rounded-full text-lg font-medium transition-all duration-300'
      >
        {isPlaying ? <BiStop /> : <BiPlay />}
      </button>

      <button
        onClick={() => setIsMuted(!isMuted)}
        className='absolute top-4 right-4 bg-black/70 hover:bg-black/50 text-white px-4 py-4 rounded-full text-sm font-medium transition-all duration-300'
      >
        {isMuted ? <GoUnmute /> : <GoMute />}
      </button>
      <div className='bg-[url("/bg.png")] h-[50vh] lg:h-[80vh] flex bg-no-repeat bg-cover bg-center'></div>
      <div className=' flex flex-col items-center justify-center bg-orange-200  py-20'>
        <div className='py-2 font-medium text-xl'>ඊලග නැකත</div>
        <motion.div
          className='text-2xl md:text-3xl font-bold mb-6 px-4 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {event.label}
        </motion.div>

        <div className='flex gap-4 text-center text-3xl md:text-5xl px-4 font-semibold'>
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <TimeCard
              key={unit}
              value={timeLeft[unit as keyof typeof timeLeft] ?? 0}
              label={
                unit === 'days'
                  ? 'දින'
                  : unit === 'hours'
                  ? 'පැය'
                  : unit === 'minutes'
                  ? 'විනාඩි'
                  : 'තත්පර'
              }
            />
          ))}
        </div>
      </div>
      <div className='py-20 max-w-screen-xl mx-auto px-4'>
        <div className='text-center font-bold text-3xl py-3'>
          2025 අලුත් අවුරුදු නැකැත්
        </div>
        <div className='text-sm lg:text-lg py-3 text-justify'>
          සිංහලෙන් අලුත් අවුරුද්ද ලෙසත් දෙමළෙන් පුතණ්ඩු ලෙසත් හඳුන්වන සිංහල සහ
          දෙමළ අලුත් අවුරුද්ද, ශ්‍රී ලංකාවේ වඩාත්ම වැදගත් සංස්කෘතික සැමරුමකි. එය
          පැරණි වසරේ අවසානය සහ නව වසරේ ආරම්භය සනිටුහන් කරයි, එය මීන රාශියේ (මීන)
          සිට මේෂ රාශියට (මේෂ) සූර්යයාගේ චලනය මත පදනම් වේ. බටහිර අලුත් අවුරුද්ද
          මෙන් නොව, සිංහල සහ දෙමළ අලුත් අවුරුද්ද විවිධ චාරිත්‍ර වාරිත්‍ර සහ
          සිරිත් විරිත් නියම කරන අද්විතීය නැකත් (සුබ කාල) මාලාවක් අනුගමනය කරයි.
        </div>
        <div className='text-center font-bold text-xl py-3'>
          නැකත් වල වැදගත්කම
        </div>
        <div className='text-sm lg:text-lg text-justify'>
          නැකත් යනු විවිධ අවුරුදු කටයුතු සඳහා ජ්‍යෝතිඃ ශාස්ත්‍රඥයින් විසින් නියම
          කරන ලද පූර්ව නිශ්චිත සුබ වේලාවන් ය. ඉදිරි වසර සඳහා සමෘද්ධිය, සෞඛ්‍යය
          සහ සතුට සහතික කිරීම සඳහා මෙම නිශ්චිත වේලාවන් මහත් භක්තියෙන් අනුගමනය
          කරනු ලැබේ. සෑම වසරකම, ජ්‍යෝතිඃ ශාස්ත්‍රීය ගණනය කිරීම් මත පදනම්ව නැකත්
          වේලාවන් තරමක් වෙනස් වේ.
        </div>

        <div className='py-10 max-w-screen-md mx-auto border border-orange-500 rounded-4xl mt-10 px-10 flex flex-col gap-5'>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              නව සඳ බැලීම
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අභිනව චන්ද්‍ර වර්ෂය සඳහා මාර්තු මස 30 වැනි ඉරිදා දින ද අභිනව සූර්ය
              වර්ෂය සඳහා මැයි මස 01 වැනි බ්‍රහස්පතින්දා දින ද නව සඳ බැලීම මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              පරණ අවුරුද්ද සඳහා ස්නානය
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 13 වැනි ඉරිදා දින දිවුල්පත් යුෂ මිශ්‍ර නානු ගා ස්නානය
              කොට ඉෂ්ට දේවතා අනුස්මරණයෙහි යෙදී වාසය මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              අලුත් අවුරුදු උදාව
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 14 වැනි සඳුදා දින පූර්වභාග 03.21 ට සිංහල අලුත්
              අවුරුද්ද උදාවෙයි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              පුණ්‍ය කාලය
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 13 වැනි ඉරිදා අපරභාග 08.57 සිට පසුදින එනම් 14 වැනි
              සඳුදා පූර්වභාග 09.45 දක්වා පුණ්‍ය කාලය බැවින් අපේල් මස් 13 ඉරිදා
              අපරභාග 08.57 ට පළමුව ආහාර පාන ගෙන සියලු වැඩ අත්හැර ආගමික වතාවත්වල
              යෙදීම ද, පුණ්‍ය කාලයේ අපරභාග කොටස එනම් අප්‍රේල් මස 14 වැනි සඳුදා
              පූර්වභාග 03.21 සිට 14 වැනි සඳුදා පූර්වභාග 09.45 දක්වා පහත දැක්වෙන
              අයුරින් ආහාර පිසීම,වැඩ ඇල්ලීම,ගනුදෙනු කිරීම හා ආහාර අනුභවය ආදී
              නැකත් චාරිත්‍ර විධි ඉටු කිරීම මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>ආහර පිසීම</div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 14 වැනි සඳුදා පූර්වභාග 04.04 ට තඹ වර්ණ වස්ත්‍රාභරණයෙන්
              සැරසී දකුණු දිශාව බලා ළිප් බැඳ ගිනි මොළවා කිරිබතක්ද කැවිලි
              වර්ගයක්ද දී කිරි සහ විලඳ ද පිළියෙල කර ගැනීම මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              වැඩ ඇල්ලීම, ගනුදෙනු කිරීම හා ආහාර අනුභවය
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 14 වැනි සඳුදා පූර්වභාග 06.44 ට මුතු හා ශ්වේත වර්ණ
              වස්ත්‍රාභරණයෙන් සැරසී දකුණු දිශාව බලා සියලු වැඩ අල්ලා ගනුදෙනු කොට
              ආහාර අනුභව කිරීම මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              හිසතෙල් ගෑම
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 16 වැනි බදාදා පූර්වභාග 09.04 ට පච්ච හෙවත් කොල පැහැති
              වස්ත්‍රාභරණයෙන් සැරසී උතුරු දිශාව බලා හිසට කොහොඹ පත් ද පයට කොළොන්
              පත් ද තබා කොහොඹ පත් යුෂ මිශ්‍ර නානු හා තෙල් ගා ස්නානය කිරීම මැනවි.
            </div>
          </div>
          <div className=''>
            <div className='text-center font-bold text-xl py-3'>
              රැකීරක්ෂා සඳහා පිටත්ව යෑම
            </div>
            <div className='text-sm lg:text-lg text-center'>
              අප්‍රේල් මස 17 වැනි බ්‍රහස්පතින්දා පූර්වභාග 09.03 ට රන්වන් පැහැති
              වස්ත්‍රාභරණයෙන් සැරසී කිරිබතක් හා එළකිරි මිශ්‍ර කැවිලි වර්ගයක්
              අනුභව කර උතුරු දිශාව බලා පිටත්ව යෑම මැනවි.
            </div>
          </div>
        </div>
      </div>
      <div className='py-5 text-sm font-medium bg-zinc-200  text-center flex gap-1 items-center justify-center'>
        {' '}
        Developed by{' '}
        <Link
          className='hover:text-amber-700'
          href={'http://ayodyabanukafernando.com'}
        >
          <div className='underline'>AB</div>
        </Link>
      </div>
    </div>
  );
}

function TimeCard({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className='bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg flex flex-col items-center w-17 md:w-28'
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className=' text-3xl md:text-4xl font-mono'
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className='text-sm md:text-base text-zinc-500 mt-1 capitalize'>
        {label}
      </div>
    </motion.div>
  );
}
