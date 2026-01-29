'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface TeamMember {
	name: string;
	role: string;
	imageUrl: string;
	xUrl: string;
	linkedinUrl: string;
}

const teamMembers: TeamMember[] = [
	{
		name: 'Alex Johnson',
		role: 'Developers Head',
		imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Jordan Smith',
		role: 'Developers Head',
		imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Casey Williams',
		role: 'Developer',
		imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	}
];

const juniorTeamMembers: TeamMember[] = [
	{
		name: 'Sam Anderson',
		role: 'Junior Developer',
		imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Jordan Lee',
		role: 'Junior Developer',
		imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	},
	{
		name: 'Alex Chen',
		role: 'Junior Developer',
		imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
		xUrl: '#',
		linkedinUrl: '#',
	}
];

const TeamSection: React.FC = () => {

	return (
		<section id="teams" className="bg-zinc-950 py-20 md:py-32">
			<div className="container mx-auto px-6 max-w-7xl">
				<div
					className="max-w-2xl mx-auto text-center mb-12"
				>
					<h2
						className="mx-auto mt-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-yellow-50 sm:text-5xl underline underline-offset-8 decoration-yellow-200/50"
						style={{
							textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
						}}
					>
						Last Year: Ignitia Team
					</h2>
					<p
						className="mt-6 text-lg text-gray-300"
					>
						The brilliant minds powering Ignitia 2K26 — developers, designers, and innovators bringing creativity to life.
					</p>
				</div>

				<div
					className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
				>
					{teamMembers.map((person) => (
						<div
							key={person.name}
							className="bg-zinc-900 rounded-2xl shadow-lg"
						>
							<div className="overflow-hidden rounded-t-2xl">
								<Image
									className="h-80 w-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
									src={person.imageUrl}
									alt={`Portrait of ${person.name}`}
									width={500}
									height={500}
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold tracking-tight text-white">
									{person.name}
								</h3>
								<p className="text-base font-medium text-yellow-300">
									{person.role}
								</p>
								<div className="mt-4 flex gap-x-4">
									<Link
										href={person.xUrl}
										className="text-gray-400 hover:text-yellow-300 transition-colors"
										aria-label={`${person.name}'s X profile`}
									>
										<span className="font-bold text-lg">X</span>
									</Link>
									<Link
										href={person.linkedinUrl}
										className="text-gray-400 hover:text-yellow-300 transition-colors"
										aria-label={`${person.name}'s LinkedIn profile`}
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
										</svg>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="container mx-auto px-6 max-w-7xl">
				<div
					className="max-w-2xl mx-auto text-center mb-12"
				>
					<h2
						className="mx-auto mt-5 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-yellow-50 sm:text-5xl underline underline-offset-8 decoration-yellow-200/50"
						style={{
							textShadow: "0 0 30px rgba(253,224,71,0.6), 0 0 60px rgba(253,224,71,0.4)"
						}}
					>
						Junior Developers
					</h2>
				</div>

				<div
					className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
				>
					{juniorTeamMembers.map((person) => (
						<div
							key={person.name}
							className="bg-zinc-900 rounded-2xl shadow-lg"
						>
							<div className="overflow-hidden rounded-t-2xl">
								<Image
									className="h-80 w-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
									src={person.imageUrl}
									alt={`Portrait of ${person.name}`}
									width={500}
									height={500}
								/>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold tracking-tight text-white">
									{person.name}
								</h3>
								<p className="text-base font-medium text-yellow-300">
									{person.role}
								</p>
								<div className="mt-4 flex gap-x-4">
									<Link
										href={person.xUrl}
										className="text-gray-400 hover:text-yellow-300 transition-colors"
										aria-label={`${person.name}'s X profile`}
									>
										<span className="font-bold text-lg">X</span>
									</Link>
									<Link
										href={person.linkedinUrl}
										className="text-gray-400 hover:text-yellow-300 transition-colors"
										aria-label={`${person.name}'s LinkedIn profile`}
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
											<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
										</svg>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default TeamSection;