#!/usr/bin/env python3
"""audio_src/* -> audio.js (base64 mp3). Efekty mono 64k z normalizacja szczytu, muzyka loudnorm."""
import subprocess,base64,os,sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));S=R+'/audio_src';T='/tmp/audbuild';os.makedirs(T,exist_ok=True)
SFX=['tap','buy','sell','bad','depart','police','escape','arrest','bribe','rob','shots','demon','win','lose','siren_loop']
MUS={'m_menu':('mp3','80k',2),'m_game':('wav','64k',2),'m_danger':('wav','64k',2),'m_end':('wav','64k',2)}
def run(a):subprocess.run(a,check=True,stderr=subprocess.DEVNULL,stdout=subprocess.DEVNULL)
def peakgain(f):
    r=subprocess.run(['ffmpeg','-i',f,'-af','volumedetect','-f','null','-'],capture_output=True,text=True).stderr
    m=[l for l in r.splitlines() if 'max_volume' in l][0];return -3.0-float(m.split(':')[1].replace('dB','').strip())
out={}
for n in SFX:
    src=f'{S}/{n}.wav';g=peakgain(src);dst=f'{T}/{n}.mp3'
    run(['ffmpeg','-y','-i',src,'-ac','1','-ar','32000','-af',f'volume={g:.1f}dB,afade=t=out:st=0:d=0','-b:a','56k',dst] if False else ['ffmpeg','-y','-i',src,'-ac','1','-ar','32000','-af',f'volume={g:.1f}dB','-b:a','56k',dst])
    out[n]=base64.b64encode(open(dst,'rb').read()).decode()
for n,(ext,br,ch) in MUS.items():
    src=f'{S}/{n}.{ext}';dst=f'{T}/{n}.mp3'
    run(['ffmpeg','-y','-i',src,'-ac',str(ch),'-ar','32000','-af','loudnorm=I=-20:TP=-2:LRA=11','-b:a',br,dst])
    out[n]=base64.b64encode(open(dst,'rb').read()).decode()
js='const AUD={'+','.join(f'{k}:"{v}"' for k,v in out.items())+'};\n'
open(R+'/audio.js','w').write(js);print('audio.js',len(js)//1024,'KB')
