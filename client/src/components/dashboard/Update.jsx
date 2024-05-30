import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecord } from '../../services/operations/recordsApi';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const {token} = useSelector((state) => state.auth);
  const {recordId} = useParams();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Watch the type field to conditionally render the priority input
  const recordType = watch('type');

  const onSubmit = (data) => {
    const record = {
      domain: data.domain,
      type: data.type,
      ttl: parseInt(data.ttl),
      value: data.value,
      ...(data.type === 'MX' && { priority: data.priority ? parseInt(data.priority) : undefined })
    };
    dispatch(updateRecord(record, recordId, token , navigate));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-richblack-200 shadow-md rounded-lg space-y-4 mt-24 ">
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2 text-white">Domain:</label>
        <input 
          {...register('domain', { required: true })} 
          placeholder='your-domain.example1234.com'
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
        />
        {errors.domain && <span className="text-red-600 text-sm mt-1">This field is required</span>}
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2 text-white">Type:</label>
        <input 
          {...register('type', { required: true })} 
          placeholder='A or AAAA or CNAME ... etc'
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.type && <span className="text-red-600 text-sm mt-1">This field is required</span>}
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2 text-white">TTL:</label>
        <input 
           placeholder='300'
          type="number" 
          {...register('ttl', { required: true })} 
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.ttl && <span className="text-red-600 text-sm mt-1">This field is required</span>}
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700 mb-2 text-white">Value:</label>
        <input 
          {...register('value', { required: true })} 
          placeholder='192.168.1.1'
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.value && <span className="text-red-600 text-sm mt-1">This field is required</span>}
      </div>
      {recordType === 'MX' && (
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2 text-white">Priority:</label>
          <input 
            type="number" 
            {...register('priority')} 
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Record
      </button>
    </form>
  );
};

export default Update;
