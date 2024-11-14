import React from 'react';
import './about.css';
import { Button } from './ui/button';
import { IconBrandFacebook, IconBrandInstagram, IconMail, IconBulb } from '@tabler/icons-react';


function About() {
  return (
    <div className='main-content'>
      <div className='upper'>
        <div className='titles'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-2">
            Transforming Concepts <br /> 
            <span className="inline-flex items-center mt-3">
              Into Solutions
              <IconBulb size={80} color='#ffc683' className="ml-10 " />
            </span>
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Our mission is to provide innovative solutions 
              to complex problems.  <br />We strive to be the best in our field.
            </p>
            <Button variant="outline">Donate</Button>
        </div>
        <img src="adw.png" alt="" className='pics-1' />
      </div>

      <div className='bottom'>
        <div>
          <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">Meet our <br /> Creative Team</h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            A group of colleges  who are passionate about <br />
            creating innovative solutions
          </p>

        </div>

        <div className='background'>
          <img src="prof2.jpg" alt="" className='profile'/>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-2">Philippe Louis Garibay</h4>
          <p className="text-sm text-muted-foreground">Frontend Software</p>
          <blockquote className="mt-4 border-l-2 pl-2 italic text-sm mb-8">Lorem ipsum creating innovative solutions creating innovative solutions</blockquote>
          <div className='socials'>
            <IconBrandFacebook color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconBrandInstagram color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconMail color='#ffc683' size={30}/>
          </div>
        </div>

        <div className='background'>
          <img src="prof2.jpg" alt="" className='profile'/>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-2">Philippe Louis Garibay</h4>
          <p className="text-sm text-muted-foreground">Frontend Software</p>
          <blockquote className="mt-4 border-l-2 pl-2 italic text-sm mb-8">Lorem ipsum creating innovative solutions creating innovative solutions</blockquote>
          <div className='socials'>
            <IconBrandFacebook color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconBrandInstagram color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconMail color='#ffc683' size={30}/>
          </div>
        </div>

        <div className='background'>
          <img src="prof2.jpg" alt="" className='profile'/>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-2">Philippe Louis Garibay</h4>
          <p className="text-sm text-muted-foreground">Frontend Software</p>
          <blockquote className="mt-4 border-l-2 pl-2 italic text-sm mb-8">Lorem ipsum creating innovative solutions creating innovative solutions</blockquote>
          <div className='socials'>
            <IconBrandFacebook color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconBrandInstagram color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconMail color='#ffc683' size={30}/>
          </div>
        </div>


        <div className='background'>
          <img src="prof2.jpg" alt="" className='profile'/>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-2" >Philippe Louis Garibay</h4>
          <p className="text-sm text-muted-foreground">Frontend Software</p>
          <blockquote className="mt-4 border-l-2 pl-2 italic text-sm mb-8">Lorem ipsum creating innovative solutions creating innovative solutions</blockquote>
          <div className='socials'>
            <IconBrandFacebook color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconBrandInstagram color='#ffc683' size={30} style={{
              marginRight: '15px'
            }}/>
            <IconMail color='#ffc683' size={30}/>
          </div>
        </div>


      </div>

      
    </div>
  );
}

export default About;
