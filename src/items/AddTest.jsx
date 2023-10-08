import React from 'react'
import { tokens } from '../theme';
import { useTheme } from '@mui/material';

const AddTest = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <div class="content-wrapper" >

   
    <div class="content-inner" >

      
        {/* <div class="page-header page-header-light">
        
            <div class="breadcrumb-line breadcrumb-line-light header-elements-lg-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="{{ route('dashboard') }}" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <span class="breadcrumb-item active">Add Customer</span>
                    </div>

                    <a href="#" class="header-elements-toggle text-body d-lg-none"><i class="icon-more"></i></a>
                </div>

            </div>
        </div> */}
      


        
        <div class="container">
            <div class="row justify-content-center m-3 mt-2" >
                <div class="col-8">
             
                <div class="card">
                    <div class="card-header">
                        
                            <h3>Add Customer info</h3>
                       
                    </div>
                    <div class="card-body">
                        <form action="" method="POST" enctype="multipart/form-data">
                           
                            {/* @csrf

                            @if(Session::has('success'))
                                <div class="alert alert-success">
                                    {{Session::get('success')}}
                                </div>
                             @endif */}
                                

                                <div class="row">

                                    <div class="col-sm-6 form-group-floating mb-2">
                                        <div class="position-relative mb-10">
                                            <input type="text" class="form-control form-control-outline" placeholder="Placeholder" required
                                            name="name" />
                                           
                                            <label class="label-floating">Enter Full_Name</label>
                                            {/* @error('name')
                                            <span class="error text-danger">{{ $message }}</span>
                                            @enderror */}
                                        </div>
                                    </div>
                             



                                    <div class="col-sm-6 form-group-floating mb-2">
                                        <div class="position-relative mb-10">
                                            <input type="email" class="form-control form-control-outline" placeholder="Placeholder"
                                            name="email" />
                                            <label class="label-floating">Enter Email</label>
                                            {/* @error('email')
                                            <span class="error text-danger">{{ $message }}</span>
                                            @enderror */}
                                        </div>
                                    </div>
                                  
                                    {/* <div class="col-sm-6 form-group-floating mb-2">
                                        <div class="position-relative mb-10">
                                            <select class="form-control form-control-outline select-search" data-fouc   placeholder="Placeholder" 
                                            name="state" required>
                                         
                                        <option value="Addis Ababa">Addis Ababa </option>    
                                        <option value="Dire Dawa">Dire Dawa</option>   
                                        <option value="Afar">Afar</option>     
                                        <option value="Amhara">Amhara</option>   
                                        <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>   
                                        <option value="Gambella">Gambella</option>   
                                        <option value="Harari">Harari</option>   
                                        <option value="Oromia">Oromia </option>   
                                        <option value="SNNPR">SNNPR</option>   
                                        <option value="SWEPR">SWEPR</option>   
                                        <option value="Sidama">Sidama</option>   
                                        <option value="Somali">Somali</option>   
                                        <option value="Tigray">Tigray</option>   
                                        </select>
                                            <label class="label-floating">Select State</label>
                                        </div>
                                    </div> */}

                                    
                                   <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <input type="text" class="form-control form-control-outline" placeholder="Placeholder" required
                                        name="sub_city" />
                                        <label class="label-floating">Sub_city/Zone</label>
                                        {/* @error('sub_city')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror */}
                                    </div>
                                </div>
                                  
                                <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <input type="text" class="form-control form-control-outline" placeholder="Placeholder" required
                                        name="woreda" />
                                        <label class="label-floating">Woreda</label>
                                        {/* @error('woreda')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror */}
                                    </div>
                                </div>
                                  
                                <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <input type="text" class="form-control form-control-outline" placeholder="Placeholder" required
                                        name="kebele" /> 
                                        <label class="label-floating">Kebele</label>
                                        {/* @error('kebele')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror */}
                                    </div>
                                </div>
                                  
                                <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <input type="text" class="form-control form-control-outline" placeholder="Placeholder" 
                                        name="phone_number" />
                                        <label class="label-floating">Phone_Number</label>
                                        {/* @error('phone_number')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror */}
                                    </div>
                                </div>
                                     
                                {/* <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <select  required class="form-control form-control-outline   select-search" data-fouc placeholder="Placeholder" 
                                        name="agent_id" >
                                        <option disabled selected>Select Agent Name</option>
                                    <option value="{{$agent->id}}">item 1</option>    
                                    <option value="{{$agent->id}}">item 1</option> 
                                    <option value="{{$agent->id}}">item 1</option> 
                                   
                                    </select>
                                        <label class="label-floating">Select Agent</label>
                                        @error('agent_id')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div> */}

                                <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <select class="form-control form-control-outline" placeholder="Placeholder" 
                                        name="gender" required>
                                     
                                    <option value="Male">Male</option>    
                                    <option value="Female">Female</option>    
                                    </select>
                                        <label class="label-floating">Select Gender</label>
                                    </div>
                                </div>

                                <div class="col-sm-6 form-group-floating mb-2">
                                    <div class="position-relative mb-10">
                                        <input type="text" class="form-control form-control-outline" placeholder="Placeholder"
                                        name="tin_number" />
                                        <label class="label-floating">Tin_Number</label>
                                        {/* @error('tin_number')
                                        <span class="error text-danger">{{ $message }}</span>
                                        @enderror */}
                                    </div>
                                </div>


                                    <div class="form-group mb-0 mt-10 ml-30">
                                        <div class="row justify-content-center">
                                            <a class="btn btn-danger mx-5" href="{{route('customer.index')}}">Cancel</a>

                                            <input name="form_botcheck" class="form-control" type="hidden" value="" />
                                            <button type="submit" name="submit"
                                                    class="btn btn-dark btn-theme-colored"
                                                    data-loading-text="Please wait...">Submit
                                            </button>
                                           
                                       
                                        </div>
                                       

                                    </div>

                                </div>
                        </form>

                    </div>
                </div>
            </div>   
</div>

        













            </div>
        </div>
        

        </div>
  )
}

export default AddTest