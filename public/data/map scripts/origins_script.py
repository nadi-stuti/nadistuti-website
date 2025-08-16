# Let me organize all the information I've gathered about India's holy rivers into a comprehensive table
# I'll create a structured dataset with all the requested information

import pandas as pd

# Creating the comprehensive data for India's major holy rivers
holy_rivers_data = {
    'River Name': [
        'Ganga (Ganges)', 
        'Yamuna', 
        'Saraswati', 
        'Narmada', 
        'Godavari', 
        'Krishna', 
        'Kaveri (Cauvery)', 
        'Indus (Sindhu)', 
        'Brahmaputra', 
        'Mahanadi', 
        'Tapti (Tapi)'
    ],
    
    'Place of Origin (with Description)': [
        'Gomukh (Gaumukh) - Terminus of Gangotri Glacier, meaning "Cow\'s Mouth", situated at 13,200 ft (4,023 m) in Uttarkashi district, Uttarakhand',
        'Yamunotri Glacier - Located on southwestern slopes of Bandarpunch peaks in the Lower Himalayas, Uttarkashi district, Uttarakhand',
        'Har-ki-Dun Glacier - Located in Bandarpunch massif, West Garhwal, Himalayas (historically); considered a mystical/underground river',
        'Amarkantak Plateau - Located in Anuppur district, Madhya Pradesh, in the Maikal Hills (Eastern Satpura range), at meeting point of Vindhya and Satpura ranges',
        'Trimbakeshwar - Located in Nashik district, Maharashtra, originating from Brahmagiri mountains in the Western Ghats at elevation of about 1,295 meters',
        'Mahabaleshwar - Located near Jor village in Satara district, Maharashtra, in the Western Ghats at elevation of about 1,300-1,337 meters',
        'Talakaveri - Located on Brahmagiri hills near Bhagamandala in Kodagu district, Karnataka, in the Western Ghats at 1,276-1,341 meters above sea level',
        'Seng Khabab (Lion\'s Mouth) - Located near Mount Kailash and Mansarovar Lake in Tibet, at elevation of around 5,500 meters',
        'Angsi Glacier/Chemayungdung Glacier - Located near Mount Kailash and Lake Mansarovar in Tibetan Himalayas, at elevation of 6,020 meters',
        'Sihawa Mountain - Located in Dhamtari district, Chhattisgarh, near Pharsiya village at 442 meters above sea level in Eastern Ghats extension',
        'Multai - Located in Betul district, Madhya Pradesh, on eastern slopes of Satpura Range at elevation of 752 meters'
    ],
    
    'Latitude': [
        '30°55\'36"N',
        '31°1\'21"N', 
        'Approx 31°N',
        'Approx 22°40\'N',
        '19°56\'N',
        'Approx 17°55\'N',
        '12°23\'08"N',
        'Approx 31°N',
        'Approx 30°N',
        'Approx 20°45\'N',
        'Approx 21°52\'N'
    ],
    
    'Longitude': [
        '79°4\'51"E',
        '78°27\'18"E',
        'Approx 78°30\'E',
        'Approx 81°45\'E',
        '73°32\'E',
        'Approx 73°40\'E',
        '75°29\'29"E',
        'Approx 81°30\'E',
        'Approx 82°N',
        'Approx 81°30\'E',
        'Approx 78°25\'E'
    ],
    
    'General Flow Direction': [
        'Northwest to Southeast (Himalayas to Bay of Bengal)',
        'North-Northwest to Southeast (flows parallel to Ganga, merges at Prayagraj)',
        'Southwest (historically flowed from Himalayas to Arabian Sea)',
        'East to West (flows westward to Arabian Sea)',
        'West to East (flows eastward across Deccan Plateau to Bay of Bengal)',
        'West to East (flows eastward through peninsular India to Bay of Bengal)',
        'Northwest to Southeast (flows through Karnataka and Tamil Nadu to Bay of Bengal)',
        'Northwest to Southwest (flows from Tibet through Ladakh to Arabian Sea)',
        'East to Southwest (flows from Tibet through Assam and Bangladesh to Bay of Bengal)',
        'Northwest to Southeast (flows through Chhattisgarh and Odisha to Bay of Bengal)',
        'East to West (flows westward through Maharashtra and Gujarat to Arabian Sea)'
    ],
    
    'Special Geographical Features': [
        'Length: 2,525 km; Major tributaries: Yamuna, Ghaghara, Gandak, Koshi (left), Sone, Damodar (right); Forms large delta in Bengal; Passes through Haridwar, Varanasi, Patna',
        'Length: 1,376 km; Major tributaries: Tons, Chambal, Sindh, Betwa, Ken; Merges with Ganga at Triveni Sangam, Prayagraj; Flows through Delhi, Mathura, Agra; Forms fertile Ganga-Yamuna Doab',
        'Length: ~1,600 km (historical); Major tributaries: Sutlej, Drishadvati; Now mostly underground/extinct; Archaeological evidence along Ghaggar-Hakra valley; Connected ancient Indus Valley Civilization',
        'Length: 1,312 km; Major tributaries: Tawa, Hiran, Barna; Flows through rift valley between Vindhya and Satpura ranges; Famous for Marble Rocks and Dhuandhar Falls near Jabalpur; Major dams: Sardar Sarovar, Narmada Sagar',
        'Length: 1,465 km; Major tributaries: Pravara, Manjra, Wardha, Wainganga; Known as "Dakshina Ganga" (Southern Ganges); Forms extensive delta; Passes through Nashik, Rajahmundry; Second longest river in India',
        'Length: 1,400 km; Major tributaries: Tungabhadra, Bhima, Koyna, Ghataprabha; Third longest river in India; Passes through Sangli, Vijayawada; Forms fertile delta region; Major dams: Nagarjuna Sagar, Srisailam',
        'Length: 800 km; Major tributaries: Arkavati, Bhavani, Kabini, Amaravati; Flows through Mysore, Tiruchirappalli; Forms Kaveri delta in Tamil Nadu; Known as "Ganga of the South"; Major dams: Krishnaraja Sagar',
        'Length: 3,180 km; Major tributaries: Zanskar, Shyok, Kabul; One of longest rivers in Asia; Enters India through Ladakh; Associated with ancient Indus Valley Civilization; Flows mainly through Pakistan',
        'Length: 2,900 km (Yarlung Tsangpo-Brahmaputra system); Major tributaries: Dibang, Lohit, Subansiri; Known as Yarlung Tsangpo in Tibet, Dihang in Arunachal Pradesh; Forms world\'s largest river island (Majuli); Highly braided river',
        'Length: 900 km; Major tributaries: Seonath, Jonk, Hasdeo, Ib; Passes through Raipur, Sambalpur, Cuttack; Hirakud Dam (world\'s longest earthen dam); Important for Chilika Lake ecosystem',
        'Length: 724 km; Major tributaries: Purna, Girna, Panjhra; One of only three peninsular rivers flowing east to west; Flows parallel to Narmada; Passes through Burhanpur, Surat; Major dam: Ukai Dam'
    ]
}

# Create DataFrame
df = pd.DataFrame(holy_rivers_data)

# Display the table
print("INDIA'S MAJOR HOLY RIVERS - COMPREHENSIVE TABLE")
print("=" * 80)
print()

# Print in a more readable format
for i, row in df.iterrows():
    print(f"{i+1}. {row['River Name'].upper()}")
    print(f"   Origin: {row['Place of Origin (with Description)']}")
    print(f"   Coordinates: {row['Latitude']}, {row['Longitude']}")
    print(f"   Flow Direction: {row['General Flow Direction']}")
    print(f"   Special Features: {row['Special Geographical Features']}")
    print()

# Save as CSV for reference
df.to_csv('india_holy_rivers_comprehensive.csv', index=False)
print(f"Table saved as CSV with {len(df)} rivers.")